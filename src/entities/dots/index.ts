export function useDotsAnimation() {
  const dots = ref('')

  const animatedDots = computed(() => dots.value)

  onMounted(() => {
    const interval = setInterval(() => {
      if (dots.value.length < 3) {
        dots.value += '.'
      } else {
        dots.value = ''
      }
    }, 500)

    onBeforeUnmount(() => {
      clearInterval(interval)
    })
  })

  return { animatedDots }
}
