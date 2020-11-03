import { act, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { ToastProvider, useToast } from '../../hooks/toast';

describe('Toast hook', () => {
  it('should be a display message', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    // console.log(result.current);

    // result.current.addToast({
    //   type: 'success',
    //   title: 'Deu bom',
    //   description: 'Descrição de sucesso!',
    // });

    result.current.addToast({
      type: 'success',
      title: 'Deu bom',
      description: 'Descrição de sucesso!',
    });

    // act(() => {
    //   result.current.addToast({
    //     type: 'success',
    //     title: 'Deu bom',
    //     description: 'Descrição de sucesso!',
    //   });
    // });

    result.current.removeToast('toast');
  });
});
