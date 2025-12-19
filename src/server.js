const app = require("./app");
const {connectDB} = require('./data/connection');

const PORT = 3067;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`http://localhost:${PORT}`);
    })
})