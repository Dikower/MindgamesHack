import { writable } from 'svelte/store';

function simpleCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const stepNumber = simpleCount();
export const blackScore = simpleCount();
export const whiteScore = simpleCount();
export const blackStonesCount = simpleCount();
export const whiteStonesCount = simpleCount();
export const gameHistory = writable([]);