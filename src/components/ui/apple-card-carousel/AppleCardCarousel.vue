<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from "vue";
import { CarouselKey } from "./AppleCarouselContext";

interface Props {
  initialScroll?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialScroll: 0,
});

const carouselRef = ref<HTMLDivElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const currentIndex = ref(0);

onMounted(() => {
  if (carouselRef.value) {
    carouselRef.value.scrollLeft = props.initialScroll;
    checkScrollability();
  }
});

watch(
  () => props.initialScroll,
  (newVal) => {
    if (carouselRef.value) {
      carouselRef.value.scrollLeft = newVal;
      checkScrollability();
    }
  },
);

function checkScrollability() {
  if (carouselRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value;
    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth;
  }
}

function scrollLeftFn() {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -300, behavior: "smooth" });
  }
}

function scrollRightFn() {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 300, behavior: "smooth" });
  }
}

function handleCardClose(index: number) {
  // Keep the carousel at the current position, don't auto-scroll
  currentIndex.value = index;
}

const isMobile = computed(() => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
});

provide(CarouselKey, {
  onCardClose: handleCardClose,
  currentIndex,
});
</script>

<template>
  <div class="relative w-full">
    <div
      ref="carouselRef"
      class="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
      @scroll="checkScrollability"
    >
      <div class="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />

      <div class="mx-auto flex max-w-7xl flex-row justify-start gap-4 pl-4">
        <slot />
      </div>
    </div>
    <div class="mr-10 flex justify-end gap-2">
      <button
        class="relative z-40 flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 disabled:opacity-50"
        :disabled="!canScrollLeft"
        @click="scrollLeftFn"
      >
        <svg class="size-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="relative z-40 flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 disabled:opacity-50"
        :disabled="!canScrollRight"
        @click="scrollRightFn"
      >
        <svg class="size-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
