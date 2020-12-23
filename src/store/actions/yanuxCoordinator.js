import * as types from './types';

export const connected = (state, proxemics, resourceId) => {
    return { type: types.CONNECTED, state, proxemics, resourceId }
}

export const resourcesRetrieved = resources => {
    return { type: types.RESOURCES_RETRIEVED, resources }
}

export const configureComponents = componentsConfig => {
    return { type: types.CONFIGURE_COMPONENTS, componentsConfig }
}

export const instanceComponentsDistributed = instancesComponentsDistribution => {
    return { type: types.INSTANCES_COMPONENTS_DISTRIBUTED, instancesComponentsDistribution }
}