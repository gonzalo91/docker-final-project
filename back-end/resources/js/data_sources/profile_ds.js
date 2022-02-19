const { default: axios } = require("axios")

const ProfileDS = {


    async getImageProfile() {

        const response = await axios.get('perfil/image-profile');

        return new Promise(function(resolve, reject) {
            resolve(response.data);
        });

    },

    async updateImageProfile(formData) {


        const response = await axios.post('perfil/image-profile', formData);

        return new Promise(function(resolve, reject) {
            resolve(response.data);
        });

    }

}

export default ProfileDS;