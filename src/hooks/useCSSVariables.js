import { useRef } from 'react';

export default function useCSSVariables() {
  const elementRef = useRef();

  if (elementRef && elementRef.current) {
    const { children } = elementRef.current;
    const element = children[0];
    const language = children[1].innerHTML.toLowerCase();

    switch (language) {
      case 'javascript':
        element.style.backgroundColor = 'var(--javascript)';
        break;
      case 'python':
        element.style.backgroundColor = 'var(--python)';
        break;
      case 'ruby':
        element.style.backgroundColor = 'var(--ruby)';
        break;
      case 'java':
        element.style.backgroundColor = 'var(--java)';
        break;
      case 'c++':
        element.style.backgroundColor = 'var(--cplusplus)';
        break;
      case 'c':
        element.style.backgroundColor = 'var(--c)';
        break;
      case 'swift':
        element.style.backgroundColor = 'var(--swift)';
        break;
      case 'typescript':
        element.style.backgroundColor = 'var(--typescript)';
        break;
      case 'go':
        element.style.backgroundColor = 'var(--go)';
        break;
      default:
        element.style.backgroundColor = 'var(--other)';
        break;
    }
  }

  return { elementRef };
}
