import { createClient } from "contentful";

const client = createClient({

    // This is the space ID. A space is like a project folder in Contentful termm
    space: "02sqkx1j5o2n",
    accessToken: "HgWnm6ArPC2yQq_kIL0bbh85kwJoPMbJb0vhmLBZ_rg"
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app

});


export default client;