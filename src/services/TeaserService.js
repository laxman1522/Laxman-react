import axios from "axios"
import { UrlConstants } from "../constants/urlConstants"

export const TeaserService = {

    async getShortTeasers() {
        const teasers = await axios.get(UrlConstants.TEASER_URL)
        return teasers.data;
    }
}