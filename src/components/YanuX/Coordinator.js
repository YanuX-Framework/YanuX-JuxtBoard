import './Coordinator.css';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { isEqual } from 'lodash';

import useAuthentication from '../../hooks/useAuthentication';
import useYanuxCoordinator from '../../hooks/useYanuxCoordinator';
import useBoard from '../../hooks/useBoard';

export default function (props) {
    const {
        authentication,
        logout
    } = useAuthentication();

    const {
        yanuxCoordinator,
        connected,
        resourcesRetrieved,
        configureComponents,
        instanceComponentsDistributed,
    } = useYanuxCoordinator();

    const { board, setBoard } = useBoard();

    const [alert, setAlert] = useState({ show: false });

    const handleOpenModal = (newTitle, newMessage) => {
        const title = newTitle || alert.title;
        const message = newMessage || alert.message;
        setAlert({ title, message, show: true });
    }

    const handleCloseModal = () => {
        setAlert({ show: false });
    }

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
        if (data && data.board && !isEqual(board, data.board)) {
            console.log('[YXC] Update State:', data);
            setBoard(data.board);
        }
    };

    //TODO: I should probably find a way to make this updateComponents pattern something that is "promoted" by the library/framework itself. 
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
            setBoard(data.board);
            console.log('[YXC] Resource Subscription:', resourceSubscription, 'Data:', data);
        }).catch(err => {
            handleOpenModal('Error Selecting Resource', err.message);
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

    const resourceSelected = e => {
        console.log('[YXRME] Resource Selected:', e.detail)
        selectResource(e.detail.selectedResourceId)
    }

    const createResource = e => {
        console.log('[YXRME] Create Resource:', e.detail)
        const { coordinator } = yanuxCoordinator;
        coordinator.createResource(e.detail.resourceName)
            .then(resource => {
                console.log('[YXRME] Resource Created:', resource)
            }).catch(err => {
                handleOpenModal('Error Selecting Resource', err.message)
                console.error('[YXRME] Error Creating Resource:', err)
            })
    }

    const renameResource = e => {
        console.log('[YXRME] Rename Resource:', e.detail)
        const { coordinator } = yanuxCoordinator;
        coordinator.renameResource(e.detail.resourceName, e.detail.resourceId)
            .then(resource => {
                console.log('[YXRME] Resource Renamed:', resource)
                updateResources()
            }).catch(err => {
                handleOpenModal('Error Selecting Resource', err.message)
                console.error('[YXRME] Error Renameing Resource:', err)
            })
    }

    const deleteResource = e => {
        const { coordinator } = yanuxCoordinator;
        console.log('[YXRME] Delete Resource:', e.detail)
        coordinator.deleteResource(e.detail.resourceId)
            .then(resource => {
                console.log('[YXRME] Resource Deleted:', resource)
                updateResources()
            }).catch(err => {
                handleOpenModal('Error Selecting Resource', err.message)
                console.error('[YXRME] Error Deleting Resource:', err)
            })
    }

    const shareResource = e => {
        console.log('[YXRME] Share Resource:', e.detail)
        const { coordinator } = yanuxCoordinator;
        coordinator.shareResource(e.detail.userEmail, e.detail.resourceId)
            .then(resource => {
                console.log('[YXRME] Resource Shared:', resource)
                updateResources()
            }).catch(err => {
                handleOpenModal('Error Selecting Resource', err.message)
                console.error('[YXRME] Error Sharing Resource:', err)
            })
    }

    const unshareResource = e => {
        console.log('[YXRME] Unshare Resource:', e.detail)
        const { coordinator } = yanuxCoordinator;
        coordinator.unshareResource(e.detail.userEmail, e.detail.resourceId)
            .then(resource => {
                console.log('[YXRME] Resource Unshared:', resource)
                updateResources()
            }).catch(err => {
                handleOpenModal('Error Selecting Resource', err.message)
                console.error('[YXRME] Error Unsharing Resource:', err)
            });
    }

    //TODO: This is also a good candidate to be included into the framework.
    const updatedComponentsDistribution = e => {
        const { coordinator } = yanuxCoordinator;
        console.log('[YXCDE] Updated Components Distribution:', e.detail)
        const componentsDistribution = e && e.detail && e.detail.componentsDistribution ? e.detail.componentsDistribution : null
        if (coordinator && componentsDistribution) {
            Promise.all(Object.keys(componentsDistribution)
                .map(instanceId => coordinator.setComponentDistribution(
                    componentsDistribution[instanceId].components,
                    componentsDistribution[instanceId].auto,
                    instanceId
                ))
            ).then(results => {
                console.log('[YXCDE] Updated Instances Based on the New Components Distribution:', results);
            }).catch(e => {
                console.error('[YXCDE] Something went wrong while updating Instances based on the new Components Distribution:', e);
            });
        }
    }

    //TODO: This is also a good candidate to be included into the framework.
    const resetAutoComponentsDistribution = e => {
        const { coordinator } = yanuxCoordinator;
        coordinator.getActiveInstances()
            .then(activeInstances => { distributeComponents(e.detail.instanceId, activeInstances, true) })
            .catch(err => console.error('[YXCDE] Error while getting active instances:', err));
        console.error('[YXCDE] Reset Auto Components Distribution:', e.detail);
    }

    const coordinatorInitializedRef = useRef(false);
    const componentsRuleEngineInitializedRef = useRef(false);

    const resourceManagementRef = useRef();
    const componentsDistributionRef = useRef();

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
                //TODO:
                //Try to reauthenticate with Access Token.
                //If that fails, try to acquire a new Access Token with the Refresh Token and re-attempt to authenticate with the new token.
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

        const resourceManagementElement = resourceManagementRef.current;
        if (resourceManagementElement) {
            resourceManagementElement.addEventListener('resource-selected', resourceSelected);
            resourceManagementElement.addEventListener('create-resource', createResource);
            resourceManagementElement.addEventListener('rename-resource', renameResource);
            resourceManagementElement.addEventListener('delete-resource', deleteResource);
            resourceManagementElement.addEventListener('share-resource', shareResource);
            resourceManagementElement.addEventListener('unshare-resource', unshareResource);
        }

        const componentsDistributionElement = componentsDistributionRef.current;
        if (componentsDistributionElement) {
            componentsDistributionElement.addEventListener('updated-components-distribution', updatedComponentsDistribution);
            componentsDistributionElement.addEventListener('reset-auto-components-distribution', resetAutoComponentsDistribution);
        }
        return () => {
            if (resourceManagementElement) {
                resourceManagementElement.removeEventListener('resource-selected', resourceSelected);
                resourceManagementElement.removeEventListener('create-resource', createResource);
                resourceManagementElement.removeEventListener('rename-resource', renameResource);
                resourceManagementElement.removeEventListener('delete-resource', deleteResource);
                resourceManagementElement.removeEventListener('share-resource', shareResource);
                resourceManagementElement.removeEventListener('unshare-resource', unshareResource);
            }
            if (componentsDistributionElement) {
                componentsDistributionElement.removeEventListener('updated-components-distribution', updatedComponentsDistribution);
                componentsDistributionElement.removeEventListener('reset-auto-components-distribution', resetAutoComponentsDistribution);
            }
        }
    });

    if (yanuxCoordinator.connected) {
        return (
            <React.Fragment> 
                <div className="yanux-elements">
                {props.type === "resources" ?
                    <div className="yanux-element resource-management">
                        <span className="info">Resources</span>
                        <yanux-resource-management 
                            ref={resourceManagementRef}
                            selectedResourceId={yanuxCoordinator.subscribedResourceId || yanuxCoordinator.coordinator.resource.id}
                            resources={JSON.stringify(yanuxCoordinator.resources)} />
                    </div>
                    :
                    <div className="yanux-element components-distribution">
                        <span className="info">Devices</span>
                        <yanux-components-distribution
                            ref={componentsDistributionRef}
                            instanceId={yanuxCoordinator.coordinator.instance.id}
                            componentsDistribution={JSON.stringify(yanuxCoordinator.instancesComponentsDistribution)} />
                    </div>}
                </div>
                <div className="alert">
                    <Modal show={alert.show} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{alert.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{alert.message}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </React.Fragment>);
    } else if (authentication.idToken) {
        return (
            <div className="overlay">
                <div className="text">Loading</div>
            </div>
        );
    } else { return null; }
}