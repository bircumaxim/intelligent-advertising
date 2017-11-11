let service = new (require("./video-service"))();

service.getBestVideo({
    hair : 4,
    "facial hair" : 4
}, (result) => {
    console.log(result);
});