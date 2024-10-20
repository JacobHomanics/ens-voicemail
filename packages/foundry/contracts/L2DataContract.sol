//SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract L2DataContract {
    // address slot0 = 0x9e837209b30C9cC23fA22d0E5DbE3776db8FCe7F;

    // hashed name => base address
    mapping(bytes32 node => address addr) public nodes;

    // parent: "jacobhomanics-test.eth"
    bytes32 PARENT_NODE =
        0x9049589afb2f92e8de6dc6c2bc89d5f6a2b37576afce837618a59e7e8f9f9f7a;

    // {label}.{parent}
    // {test}.{name.eth}
    // {sub}.{topic.name.eth}
    function register(string calldata label, address _addr) public {
        bytes32 node = _makeNode(PARENT_NODE, label);
        nodes[node] = _addr;
    }

    // function addr(bytes32 node) public view returns (address) {
    //     return nodes[node];
    // }

    function _makeNode(
        bytes32 parentNode,
        string calldata label
    ) public pure returns (bytes32) {
        bytes32 labelhash = keccak256(bytes(label));
        return keccak256(abi.encodePacked(parentNode, labelhash));
    }
}
