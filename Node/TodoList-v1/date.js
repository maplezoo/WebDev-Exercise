const today = new Date();

exports.getDate = function (){
    const option = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    return today.toLocaleDateString('en-US', option);
};


exports.getDay = function (){
    const option = {
        weekday: 'long'
    }
    return today.toLocaleDateString('en-US', option);
}

