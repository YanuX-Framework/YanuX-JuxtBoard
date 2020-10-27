import * as types from '../actions/types';

const yanuxCoordinatorMiddleware = (action, prevState, currentState) => {
    if (currentState.yanuxCoordinator.coordinator &&
        currentState.yanuxCoordinator.coordinator.isConnected() &&
        //TODO: List the action types you used and that you want to propagate to the YanuX Broker
        [types.ADD_NOTE,types.REMOVE_NOTE].find(t => action.type === t)) {
        //TODO: Customize the resource data according to your needs. This is just a simple example.
        const resourceData = {
            actionType: action.type,
            board: currentState.board
        };
        const subscribedResourceId = currentState.yanuxCoordinator.coordinator.subscribedResourceId;
        console.log('[YXCM] Resource Data:', resourceData, 'Subscribed Resource Id:', subscribedResourceId);
        currentState.yanuxCoordinator.coordinator
            .setResourceData(resourceData, subscribedResourceId)
            .then(savedData => { console.log('[YXCM] Saved Resource Data:', savedData) })
            .catch(e => { console.error('[YXCM] Error Saving Resource Data:', e) })
    }
};

export default yanuxCoordinatorMiddleware;