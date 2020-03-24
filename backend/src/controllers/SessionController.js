const connection = require('../database/connection');

module.exports = {
    async createImageBitmap(request,response) {
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong) {
            return response.status(400).json({error: 'No ONG found with this Id'});
        }

        return response.json(ong);
    }
}