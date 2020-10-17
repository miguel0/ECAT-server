module.exports = {
    name: "fighters",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        type: {
            type: "varchar"
        }
        
    }
}