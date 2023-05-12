declare module "geo2zip" {
    type Location = {
        latitude: number,
        longitude: number
    }
    export default async function geo2zip(location: Location): Promise<string[]>
}