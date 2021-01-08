const config = {
    components_restrictions: {
        Note: {
            //showByDefault: true,
            display: {
                operator: "AND",
                values: {
                    virtualResolution: { operator: ">=", value: [1280, null], enforce: false },
                    size: { operator: ">=", value: [200, null], enforce: false }
                },
            },
            speakers: { channels: { operator: ">=", value: 1 } },
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        },
        Edit: {
            //showByDefault: true,
            type: { value: "smartphone", enforce: false },
            display: true,
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        },
        List: {
            //showByDefault: true,
            type: { value: "smartphone", enforce: false },
            display: true,
            input: { operator: "OR", values: ["mouse", "touchscreen"] },
        }
    }
};

export default config;