import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    slides,
    project,
  } = useSlideStore();

  return <div>Editor</div>;
};

export default Editor;