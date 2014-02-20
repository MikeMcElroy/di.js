import {Provide} from 'di/annotations';

@Provide(Contents)
export function Contents() {
    return {
        eggs: 2,
        onions: 2
    };
}