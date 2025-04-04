import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const usePasswordVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const visibleButton = (
    <button
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      aria-pressed={isVisible}
      className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
      type='button'
      aria-controls='password'
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeOff aria-hidden='true' size={16} strokeWidth={2} />
      ) : (
        <Eye aria-hidden='true' size={16} strokeWidth={2} />
      )}
    </button>
  );

  return { visibleButton, isVisible, inputType: isVisible ? 'text' : 'password' };
};
