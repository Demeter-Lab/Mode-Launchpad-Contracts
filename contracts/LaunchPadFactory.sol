// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./LaunchPad.sol";

contract Register {
    function register(address _recipient) public returns (uint256 tokenId) {}
}

contract DeployFactory {
    mapping(uint256 => address) public createdLaunchPools;
    uint256 public poolCount;

    event LaunchPoolCreated(address indexed launchPoolAddress);

    constructor() {
        // sfs Mainnet Contract= 0x8680CEaBcb9b56913c519c069Add6Bc3494B7020
        Register sfsContract = Register(
            0xBBd707815a7F7eb6897C7686274AFabd7B579Ff6
        ); // This address is the testnet address of the SFS contract
        sfsContract.register(msg.sender); //Registers this contract and assigns the NFT to the owner of this contract
    }

    function deploy(
        address _tokenAddress,
        uint256 _price,
        uint256 _minInvestment,
        uint256 _maxInvestment,
        string memory _poolName,
        uint256 _durationInDays
    ) external {
        bytes memory bytecode = type(Launchpad).creationCode;
        bytes32 salt = keccak256(
            abi.encodePacked(
                _tokenAddress,
                _price,
                _minInvestment,
                _maxInvestment,
                _poolName,
                _durationInDays
            )
        );

        address launchPoolAddress;

        assembly {
            launchPoolAddress := create2(
                0,
                add(bytecode, 0x20),
                mload(bytecode),
                salt
            )
            if iszero(extcodesize(launchPoolAddress)) {
                revert(0, 0)
            }
        }

        Launchpad(launchPoolAddress).initializer(
            _tokenAddress,
            _price,
            _minInvestment,
            _maxInvestment,
            _poolName,
            _durationInDays
        );

        createdLaunchPools[poolCount] = launchPoolAddress;
        poolCount++;

        emit LaunchPoolCreated(launchPoolAddress);
    }
}
