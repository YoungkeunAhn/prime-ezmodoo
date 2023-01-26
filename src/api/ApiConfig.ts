import axios from 'axios'
import { JSONRPCClient } from 'json-rpc-2.0/dist/client'

export const BASE_URL = 'http://api.ezmodoo.com/'
const JRPC_URL = 'http://api.ezmodoo.com/rpc/priceMonitor.php'

export const client: any = new JSONRPCClient((jsonRPCRequest, formData?: FormData) => {
    if (formData) {
        formData.append('json', JSON.stringify(jsonRPCRequest))
        return fetch(JRPC_URL, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.status === 200) {
                // Use client.receive when you received a JSON-RPC response.
                return response.json().then((jsonRPCResponse) => client.receive(jsonRPCResponse))
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText))
            }
        })
    } else {
        return fetch(JRPC_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(jsonRPCRequest),
        }).then((response) => {
            if (response.status === 200) {
                // Use client.receive when you received a JSON-RPC response.
                return response.json().then((jsonRPCResponse) => client.receive(jsonRPCResponse))
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText))
            }
        })
    }
})

export declare class Api {
    post: <T>(url: string, params: Record<string, any> | string | number | undefined) => Promise<T>

    postMultipart: <T>(url: string, forData: FormData) => Promise<T>
}

export declare class api {
    priceMonitorApi: PriceMonitorApi
}

export declare type PriceMonitorList = {
    _id: string
    crawledAt: string
    createdAt: string
    deletedAt: string
    updatedAt: string
    isDeleted: boolean
    isVisible: boolean
    limitPrice: number
    minQty: number
    period: number
    products: any
    rivalProducts: any[]
    unitAmount: number
}

export declare class PriceMonitorApi {
    list: () => Promise<PriceMonitorList>
}
