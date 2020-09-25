import React, { useEffect, useRef } from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import useYanuxCoordinator from '../../hooks/useYanuxCoordinator';

export default function (props) {
    const { authentication, logout } = useAuthentication();
    const { yanuxCoordinator, connected, resourcesRetrieved } = useYanuxCoordinator();

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
            console.log(
                '[YXC] Props Expression:', this.props.expression,
                'Data Expression:', data.expression,
                'Props Total:', this.props.total,
                'Data Total:', data.total
            )
            //Update Local State with New Values
        }
    };

    const updateComponents = (instance = null) => {

    };

    const resourceSubscriptionHandler = (data, eventType) => {
        console.log(
            '[YXC] Resource Subscriber Handler Data:', data,
            'Event Type:', eventType
        )
        updateState(data)
    };


    const initializedCoordinatorRef = useRef(false);
    useEffect(() => {
        const { coordinator } = yanuxCoordinator;
        if (!initializedCoordinatorRef.current && coordinator !== null) {
            console.log('Initializing...');
            coordinator.init().then(results => {
                const [initialState, initialProxemics, initialResourceId] = results;
                console.log('[YXC] Connected to YanuX Broker');
                console.log('[YXC] Initial State', initialState);
                console.log('[YXC] Initial Proxemics', initialProxemics);
                console.log('[YXC] Initial Resource Id', initialResourceId);
                connected(initialState, initialProxemics);
                //coordinator.subscribeResource(resourceSubscriptionHandler, initialResourceId);
                //resourceSubscriptionHandler(initialState);
                //updateResources();
                //updateComponents();
            }).catch(err => {
                console.error('[YXC] Error Connecting to YanuX Broker', err);
                logout();
            });
            initializedCoordinatorRef.current = true;
        }
    });

    return null;
}