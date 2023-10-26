export default defineEventHandler(() => {
    return {
        result: {
            rating: 5,
            user_ratings_total: 2
        }
    }
    // return $fetch(
    //     'https://maps.googleapis.com/maps/api/place/details/json',
    //     {
    //         params: {
    //             key: '???',
    //             place_id: '????',
    //             fields: 'rating,user_ratings_total'
    //         }
    //     }
    // );
})