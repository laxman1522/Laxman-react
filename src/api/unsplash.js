import axios from "axios";

export default axios.create({
    baseURL:"https://api.unsplash.com/",
    headers:{
        Authorization:'Client-ID lCaHmVnzt06OubUlHhWZUl3YD9aKr6vMAXy9iyy0kZo'
    }
});