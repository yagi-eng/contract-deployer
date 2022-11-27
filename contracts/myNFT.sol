// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// assume that there are files which name is n (n = 1,2, ..., 100)
contract myNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("myNFT", "MN") {}

    // XXX make enable to change from outside or use constructor
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://QmR9gMXXoC3RRnZVWGgJcHkRLjq2UqEkA7ifQqiMc7QGPN/";
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(recipient, newTokenId);

        return newTokenId;
    }
}
