// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity ^0.8.0;

import "./Launchpad.sol";

contract Register {
    function register(address _recipient) public returns (uint256 tokenId) {}
}

contract LaunchPadFactory {
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

    // factory deploy function
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

    // *****************************************************************************//
    //////////////////////////// VIEW FUNCTIONS //////////////////////////////////////

    // function to get the launchpad name
    function getPadName(
        address _padAddress
    ) external view returns (string memory) {
        return Launchpad(_padAddress).poolName();
    }

    // function to get the launchpad duration
    function getPadDuration(
        address _padAddress
    ) external view returns (uint256) {
        uint256 saleDuration = Launchpad(_padAddress).saleDurationInSeconds();
        return saleDuration;
    }

    // function to get the pad maximum cap
    function getPadMaxCap(address _padAddress) external view returns (uint256) {
        uint256 padMaxCap = Launchpad(_padAddress).maxInvestment();
        return padMaxCap;
    }

    // function to get the pad minimum cap
    function getPadMinCap(address _padAddress) external view returns (uint256) {
        uint256 padMinCap = Launchpad(_padAddress).minInvestment();
        return padMinCap;
    }

    // function to get unsold tokens
    function getUnsoldTokensAmount(
        address _padAddress
    ) external view returns (uint256) {
        uint256 unsoldTokens = Launchpad(_padAddress).getUnsoldTokens();
        return unsoldTokens;
    }

    function getUserTokenPurchase(
        address _padAddress
    ) external view returns (uint256) {
        uint256 userTokenPurchase = Launchpad(_padAddress).getUserTokenPurchase(
            msg.sender
        );
        return userTokenPurchase;
    }

    function getPadPrice(address _padAddress) external view returns (uint256) {
        uint256 padPrice = Launchpad(_padAddress).tokenPrice();
        return padPrice;
    }

    function getPadContractBalance(
        address _padAddress
    ) external view returns (uint256) {
        uint256 padBalance = Launchpad(_padAddress).getContractBalance();
        return padBalance;
    }

    // *****************************************************************************//
    // //////////////////////////////////////////////////////////////////////////// //
}
