const axios = require("axios")

const getMapCordinate = async (address) => {
    const apiKey = process.env.GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    const resposne = await axios.get(url)
    if(resposne.data.status === "OK"){
        const location = resposne.data.results[ 0 ].geometry.location;
        console.log(location)
        return location
    }
    else{
        console.log("Unable to fetch")
    }
}

const getCoordinates = async (req,res) => {
    const { address } = req.query;

    console.log(getMapCordinate(address));
    const Coordinates = await getMapCordinate(address);
    res.json({message : Coordinates}) 

}


const getDistanceTime = async (req,res) => {
    const {origin , destination } = req.query;
    if(!origin || !destination){
        res.json({message : "Origin and destination are required"})
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&units=metric&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            console.log(response);
            const data = await response.data.rows[ 0 ].elements[ 0 ];
            console.log(data.duration)
            res.json({message : [{"time" : data.duration.text} , {"distance" : data.distance.text}]})
        }
    } catch (error) {
        console.log(error);
        res.json({message : "Something went wrong"})

    }
}

const getSuggestion = async (req,res) => {
    const { input } = req.query;
    if(!input){
        res.json({message : "query is required"})
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            
            const predictions = response.data.predictions;
            const descriptions = [];
    
            predictions.forEach((element , index) => {
                descriptions[index] = element.description;
            });
            
            res.json({message : descriptions});
        }
        else{
            res.json({message : "unable to fetch suggestion"})
        }
    } catch (error) {
        res.json({message : "Internal server error"})
    }
}


module.exports = {getCoordinates , getDistanceTime , getSuggestion};