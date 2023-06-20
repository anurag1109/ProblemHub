declare interface ActionMetaData {
    /**
     *
     */
    readonly onError?: (error: unknown) => any;
    /**
     *
     */
    readonly onFail?: () => any;
    /**
     *
     */
    readonly onComplete?: () => any;
    /**
     *
     */
    readonly onSuccess?: () => any;
    /**
     * Fallthrough to allow any other options before definition
     */
    readonly [key: string]: any;
  }
  
  declare interface OnCompleteAction {
    readonly meta: Pick<ActionMetaData, 'onComplete'>;
  }
  
  declare interface OnSuccessAction {
    readonly meta: Pick<ActionMetaData, 'onSuccess'>;
  }
  
  declare interface OnErrorAction {
    readonly meta: {
      readonly onError: (error: Error) => void;
    };
  }
  