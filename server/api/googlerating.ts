export default defineEventHandler(async () => {
    // return {
    //     result: {
    //         rating: 5,
    //         user_ratings_total: 2
    //     }
    // }
    return await $fetch(
        'https://maps.googleapis.com/maps/api/place/details/json',
        {
            params: {
                key: process.env.PLACES_API_KEY,
                place_id: 'ChIJXdF-n6P3eWQRcp4d6IUthyk',
                fields: 'rating,user_ratings_total'
            }
        }
    );
})