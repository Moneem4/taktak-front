//Create Vente flash input variables 
const VenteFlashPost = {
    userId :"",
    restaurantId : "",
    description: "",
    productId : "",
    duration: "",
    startTime : "",
    NewPrice : "",
    imageAd : File//not obligatory

}


// get Vente flash post

const VenteFlashPost = {
    userId :"",
    restaurant:{
        restaurantId : "",
        rate:"",
        Location:"",
        Speciality : "",
        avatar : ''
    },
    imageAd : "",
    description: "",
    product : {
        productId : "",
        Image : "",
        description : "",
    },
    duration: "",
    startTime : "",
    NewPrice : "",
    people : [{id,name, avatar}] //Ils ont déjà profité de cette vente
}

//Create Promo input variables 
const VenteFlashPost = {
    userId :"",
    restaurantId : "",
    description: "",
    productId : "",
    promoPercentage: "",
    startTime : "",
    endtTime : "",
    imageAd : File //not obligatory

}


// get Promo post

const VenteFlashPost = {
    userId :"",
    restaurant:{
        restaurantId : "",
        rate:"",
        Location:"",
        Speciality : "",
        avatar : ''
    },
    imageAd : "",
    description: "",
    product : {
        productId : "",
        Image : "",
        description : "",
    },
    promoPercentage: "",
    startTime : "",
    endtTime : "",
    people : [{id,name, avatar}] //Ils ont déjà profité de cette vente
}