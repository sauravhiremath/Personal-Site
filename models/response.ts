import mongoose from "mongoose";

interface IResponse extends mongoose.Document {
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        lowercase: true        
    },
    subject: {
        type: string
    },
    message: {
        type: string,
        required: true
    }
};

const responseSchema = new mongoose.Schema({
    email: {
        lowercase: true,
        type: String,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,     
    },
    message: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    subject: {
        type: String
    }
});

export const Response = mongoose.model<IResponse>("Response", responseSchema);
export default Response;
