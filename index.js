const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const app = require('./routes/app')
const PORT = process.env.PORT || 8000

mongoose.connect('mongodb+srv://AKASH:akashap@cluster0.hiv5i0f.mongodb.net/BLOGAPPDB?retryWrites=true&w=majority').then(() => {
    console.log('connected to DB')
    app.listen(PORT, () => { console.log(`server up at ${PORT}`) })
})