export default (posts = [], action) =>{
    // if(action.type === "CREATE"){
    //     return ... 
    // } multiple if statement
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload; //actual posts
        case 'CREATE':
            return posts;
        default:
            return posts;
    }
}