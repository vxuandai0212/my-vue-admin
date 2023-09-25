declare namespace Expose {
  interface BetterScroll {
    instance: import("@better-scroll/core").BScrollInstance
  }

  interface ImageVerify {
    getImgCode(): void
  }
}
