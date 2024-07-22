import { post } from '@/service/index'

export const testApi = async params => {
    try {
        const res = await post('/api', params)
        return res
    } catch (error) {
        console.log(error);
    }
}