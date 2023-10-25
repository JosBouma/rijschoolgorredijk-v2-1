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
    //             key: 'AIzaSyAGKyp8pqBLndO1z0O3p3vUXRlo9B83SRE',
    //             place_id: '????',
    //             fields: 'rating,user_ratings_total'
    //         }
    //     }
    // );
})