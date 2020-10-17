module.exports = {
    name: "character",
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