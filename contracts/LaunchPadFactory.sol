// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./LaunchPad.sol";

contract DeployFactory {
    mapping(uint256 => address) public createdLaunchPools;
    uint256 public poolCount;

    event LaunchPoolCreated(address indexed launchPoolAddress);

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
