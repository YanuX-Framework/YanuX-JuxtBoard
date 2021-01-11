const config = {
    components_restrictions: {
        List: {
            type: { value: "smartphone", enforce: false },
            display: true,
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        },
        Note: {
            display: {
                operator: "AND",
                values: {
                    virtualResolution: { operator: ">=", value: [1280, null], enforce: false },
                    size: { operator: ">=", value: [200, null], enforce: false }
                },
            },
            //TODO: Discover why does the Vodafone Smart Ultra 6 lack speakers channel count.
            speakers: true,
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        },
        Edit: {
            type: { value: "smartphone", enforce: false },
            display: true,
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        }
    }
};

export default config;