// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint id;
        string name;
        uint price;
        address payable seller;
        address buyer;
    }
    
    uint public itemCount = 0;
    mapping(uint => Item) public items;
    
    event ItemListed(uint id, string name, uint price, address seller);
    event ItemPurchased(uint id, address buyer);
    
    function listItem(string memory _name, uint _price) public {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, payable(msg.sender), address(0));
        emit ItemListed(itemCount, _name, _price, msg.sender);
    }
    
    function buyItem(uint _id) public payable {
        Item storage item = items[_id];
        require(msg.value == item.price, "Incorrect ETH amount sent");
        require(item.buyer == address(0), "Item already sold");
        item.seller.transfer(msg.value);
        item.buyer = msg.sender;
        emit ItemPurchased(_id, msg.sender);
    }
}
