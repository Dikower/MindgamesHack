import { writable } from 'svelte/store';
import { readable, derived } from 'svelte/store';

function simpleCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

let start = new Date();


export function updateTime(){
	start = new Date();
}

export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000),		
);

export const stepNumber = simpleCount();
export const blackScore = simpleCount();
export const whiteScore = simpleCount();
export const blackStonesCount = simpleCount();
export const whiteStonesCount = simpleCount();
export const gameHistory = writable([]);