import './Coordinator.css';
import React, { useEffect, useRef } from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import useYanuxCoordinator from '../../hooks/useYanuxCoordinator';

export default function (props) {
    const { authentication, logout } = useAuthentication();
    const {
        yanuxCoordinator,
        connected,
        resourcesRetrieved,
        configureComponents,
        instanceComponentsDistributed,
    } = useYanuxCoordinator();

    const updateResources = () => {
        const { coordinator } = yanuxCoordinator;
        if (coordinator) {
            coordinator.getResources().then(resources => {
                console.log('[YXCRM] YanuX Coordinator Resources:', resources);
                resourcesRetrieved(resources);
            }).catch(err => console.error('[YXCRM] Error getting resources:', err));
        }
    };

    const updateState = (data) => {
        if (data /* && Check if data has changed */) {
            console.log('[YXC] Update State:', data);
            //TODO: Update Local State with New Values
        }
    };

    //TODO: This is also a good candidate to be included into the framework.
    const updateComponents = (instance = null) => {
        const { coordinator, componentsRuleEngine } = yanuxCoordinator;
        console.log('yanuxCoordinator:', yanuxCoordinator);
        if (coordinator) {
            coordinator.getActiveInstances().then(activeInstances => {
                if (instance && instance.componentsDistribution && instance.componentsDistribution.auto === false) {
                    //Also, at the very least I should "virtually" rename "_id" to "id".
                    //I will probably just make a "blind" copy of "_id" into "id" so that it is backwards compatible.
                    const localInstance = activeInstances.find(i => i._id === coordinator.instance.id);
                    console.log('[YXCCRE] YanuX Coordinator Manual Component Distribution:', activeInstances);
                    console.log('[YXCCRE] Local Instance:', localInstance);
                    if (localInstance && localInstance.componentsDistribution && localInstance.componentsDistribution.components) {
                        configureComponents(localInstance.componentsDistribution.components);
                    }
                    instanceComponentsDistributed(activeInstances);
                } else if (componentsRuleEngine && coordinator.instance && coordinator.instance.id) {
                    distributeComponents(coordinator.instance.id, activeInstances);
                }
            }).catch(err => console.error('[YXCCRE] Error getting active instances:', err));
        }
    };

    //TODO: This is also a good candidate to be included into the framework.
    const distributeComponents = (instanceId, activeInstances, ignoreManual = false) => {
        const { coordinator, componentsRuleEngine } = yanuxCoordinator;
        if (coordinator && componentsRuleEngine) {
            coordinator.getProxemicsState().then(proxemics => {
                console.log('Merged Proxemics:', proxemics);
                componentsRuleEngine.proxemics = proxemics;
            }).then(() => {
                componentsRuleEngine.instances = activeInstances;
                return componentsRuleEngine.run(ignoreManual);
            }).then(res => {
                console.log(
                    '[YXCCRE] - YanuX Coordinator Components Rule Engine -',
                    'Instance Id:', instanceId,
                    'Proxemics:', componentsRuleEngine.proxemics,
                    'Instances:', componentsRuleEngine.instances,
                    'Result', res);
                if (coordinator.instance && coordinator.instance.id === instanceId) {
                    configureComponents(res.componentsConfig);
                }
                return coordinator.setComponentDistribution(res.componentsConfig, res.auto, instanceId)
            }).then(() => {
                return coordinator.getActiveInstances();
            }).then(activeInstances => {
                instanceComponentsDistributed(activeInstances);
            }).catch(err => console.error('[YXCCRE] Error:', err));
        }
    };

    const selectResource = (resourceId) => {
        const { coordinator } = yanuxCoordinator;
        return coordinator.getResourceData(resourceId).then(data => {
            console.log('[YXC] Resource Id', data.id, 'Data:', data);
            return Promise.all([Promise.resolve(data), coordinator.subscribeResource(resourceSubscriptionHandler, resourceId)]);
        }).then(results => {
            const [data, resourceSubscription] = results;
            //TODO: Update Local State with New Values
            console.log('[YXC] Resource Subscription:', resourceSubscription, 'Data:', data);
        }).catch(err => {
            //TODO: Display Error 
            //(e.g., handleOpenModal('Error Selecting Resource', err.message))
            console.error('[YXC] Error Selecting Resource:', err);
        })
    };

    const resourceSubscriptionHandler = (data, eventType) => {
        console.log('[YXC] Resource Subscriber Handler Data:', data, 'Event Type:', eventType);
        updateState(data);
    };

    const resourcesSubscriptionHandler = (data, eventType) => {
        console.log('[YXC] Resources Subscriber Handler Data:', data, 'Event Type:', eventType);
        const { coordinator } = yanuxCoordinator;
        if (eventType === 'removed' && data.id === coordinator.subscribedResourceId) {
            selectResource(null);
        }
        updateResources();
    };

    const resourceSubscriptionSubscriptionHandler = (data, eventType) => {
        console.log('[YXC] Resources Subscriber Handler Data:', data, 'Event Type:', eventType);
        if (eventType !== 'removed') { selectResource(data.resource); }
    };

    const proxemicsSubscriptionHandler = (data, eventType) => {
        console.log('[YXC] Proxemics Subscriber Handler Data:', data, 'Event Type:', eventType);
        updateComponents();
    };

    const instancesSubscriptionHandler = (data, eventType) => {
        console.log('[YXC] Instances Subscription Handler Data:', data, 'Event Type:', eventType);
        updateComponents(data);
    };

    const eventsSubcriptionHandler = (data, eventType) => {
        console.log('[YXC] Events Subscription Handler Data:', data, 'Event Type:', eventType);
    };

    const reconnectSubscriptionHandler = (state, proxemics, resourceId) => {
        console.log('[YXC] Reconnect Subscription Handler State:', state, 'Proxemics:', proxemics, 'Resource Id:', resourceId);
        updateState(state);
    };

    const coordinatorInitializedRef = useRef(false);
    const componentsRuleEngineInitializedRef = useRef(false);
    useEffect(() => {
        const { coordinator, componentsRuleEngine } = yanuxCoordinator;
        if (!coordinatorInitializedRef.current && coordinator) {
            coordinator.init().then(results => {
                const [initialState, initialProxemics, initialResourceId] = results;
                console.log('[YXC] Connected to YanuX Broker');
                console.log('[YXC] Initial State', initialState);
                console.log('[YXC] Initial Proxemics', initialProxemics);
                console.log('[YXC] Initial Resource Id', initialResourceId);
                connected(initialState, initialProxemics);
                coordinator.subscribeResource(resourceSubscriptionHandler, initialResourceId);
                resourceSubscriptionHandler(initialState);
                updateResources();
            }).catch(err => {
                console.error('[YXC] Error Connecting to YanuX Broker', err);
                logout();
            });
            coordinator.subscribeResources(resourcesSubscriptionHandler);
            coordinator.subscribeResourceSubscription(resourceSubscriptionSubscriptionHandler);
            coordinator.subscribeProxemics(proxemicsSubscriptionHandler);
            coordinator.subscribeInstances(instancesSubscriptionHandler);
            coordinator.subscribeEvents(eventsSubcriptionHandler);
            coordinator.subscribeReconnects(reconnectSubscriptionHandler);
            coordinatorInitializedRef.current = true;
        } else if (!componentsRuleEngineInitializedRef.current && componentsRuleEngine) {
            updateComponents(); componentsRuleEngineInitializedRef.current = true;
        }
    });

    const resourceManagementRef = useRef();
    const componentsDistributionRef = useRef();

    if (yanuxCoordinator.connected) {
        return (
            <React.Fragment>
                <div className="yanux-elements">
                    <div className="yanux-element resource-management">
                        <span className="info">Resources</span>
                        <yanux-resource-management
                            ref={resourceManagementRef}
                            selectedResourceId={yanuxCoordinator.subscribedResourceId || yanuxCoordinator.coordinator.resource.id}
                            resources={JSON.stringify(yanuxCoordinator.resources)} />
                    </div>
                    <div className="yanux-element components-distribution">
                        <span className="info">Devices</span>
                        <yanux-components-distribution
                            ref={componentsDistributionRef}
                            instanceId={yanuxCoordinator.coordinator.instance.id}
                            componentsDistribution={JSON.stringify(yanuxCoordinator.instancesComponentsDistribution)} />
                    </div>
                </div>
            </React.Fragment>);
    } else {
        return (
            <div className="overlay">
                <div className="text">Loading</div>
            </div>
        );
    }
}