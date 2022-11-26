// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TEST", "TS") {
        _mint(msg.sender, 10000 * 10**18);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
