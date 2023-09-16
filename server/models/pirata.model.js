const mongoose = require("mongoose");

const EsquemaPirata = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    position: {
        type: String,
        required: [true, "Crew Position es obligatorio"],
    },
    tesoros: {
        type: Number,
        required: [true, "tesoros es obligatorio"]
    },
    imagen: {
        type: String,
        required: [true, "imagen es obligatoria"]
    },
    peg: {
        type: Boolean,
        default: true
    },
    eye: {
        type: Boolean,
        default: true
    },
    hook: {
        type: Boolean,
        default: true
    },
    phrases: {
        type: String,
        required: [true, "phrases es obligatoria"]
    }
}, {timestamps: true, versionKey: false});

const Pirata = mongoose.model("piratas", EsquemaPirata);
module.exports=Pirata;