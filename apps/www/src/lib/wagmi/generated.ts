import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'incrementer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'NumberIncremented',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'setter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NumberSet',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721TokenReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc20Abi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_decimals', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc721Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useReadCounter = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"number"`
 */
export const useReadCounterNumber = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  functionName: 'number',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCounterOwner = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  functionName: 'owner',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useWriteCounter = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useWriteCounterIncrement = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'increment',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useWriteCounterSetNumber = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'setNumber',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useSimulateCounter = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useSimulateCounterIncrement =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'increment',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useSimulateCounterSetNumber =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'setNumber',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__
 */
export const useWatchCounterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: counterAbi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__ and `eventName` set to `"NumberIncremented"`
 */
export const useWatchCounterNumberIncrementedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: counterAbi,
    eventName: 'NumberIncremented',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__ and `eventName` set to `"NumberSet"`
 */
export const useWatchCounterNumberSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: counterAbi,
    eventName: 'NumberSet',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__
 */
export const useWriteIerc721TokenReceiver =
  /*#__PURE__*/ createUseWriteContract({ abi: ierc721TokenReceiverAbi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721TokenReceiverAbi,
    functionName: 'onERC721Received',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__
 */
export const useSimulateIerc721TokenReceiver =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721TokenReceiverAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721TokenReceiverAbi,
    functionName: 'onERC721Received',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const useReadMockErc20 = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMockErc20DomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mockErc20Abi,
    functionName: 'DOMAIN_SEPARATOR',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadMockErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"nonces"`
 */
export const useReadMockErc20Nonces = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'nonces',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockErc20Abi,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const useWriteMockErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc20Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMockErc20Initialize = /*#__PURE__*/ createUseWriteContract(
  { abi: mockErc20Abi, functionName: 'initialize' }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"permit"`
 */
export const useWriteMockErc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc20Abi,
  functionName: 'permit',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc20Abi,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockErc20TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockErc20Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const useSimulateMockErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: mockErc20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockErc20Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc20Abi,
    functionName: 'approve',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMockErc20Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc20Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMockErc20Permit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc20Abi,
    functionName: 'permit',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockErc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc20Abi,
    functionName: 'transfer',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc20Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const useWatchMockErc20Event = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: mockErc20Abi }
);

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockErc20Abi,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockErc20Abi,
    eventName: 'Transfer',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__
 */
export const useReadMockErc721 = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockErc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadMockErc721GetApproved = /*#__PURE__*/ createUseReadContract(
  { abi: mockErc721Abi, functionName: 'getApproved' }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadMockErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: mockErc721Abi,
    functionName: 'isApprovedForAll',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadMockErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadMockErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadMockErc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: mockErc721Abi,
    functionName: 'supportsInterface',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadMockErc721TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: mockErc721Abi,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__
 */
export const useWriteMockErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc721Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockErc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: mockErc721Abi,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMockErc721Initialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockErc721Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteMockErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockErc721Abi,
    functionName: 'safeTransferFrom',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteMockErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockErc721Abi,
    functionName: 'setApprovalForAll',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockErc721TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockErc721Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__
 */
export const useSimulateMockErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: mockErc721Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockErc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc721Abi,
    functionName: 'approve',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMockErc721Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc721Abi,
    functionName: 'initialize',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateMockErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc721Abi,
    functionName: 'safeTransferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateMockErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc721Abi,
    functionName: 'setApprovalForAll',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockErc721Abi,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc721Abi}__
 */
export const useWatchMockErc721Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: mockErc721Abi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockErc721Abi,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchMockErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockErc721Abi,
    eventName: 'ApprovalForAll',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockErc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockErc721Abi,
    eventName: 'Transfer',
  });
