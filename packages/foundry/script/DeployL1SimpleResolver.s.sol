//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {L1SimpleResolver} from "../contracts/L1SimpleResolver.sol";
import "./DeployHelpers.s.sol";

contract DeployL1SimpleResolver is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        // address baseSepoliaVerifierAddress = 0x408F25EEF5f8Da213Ce9D2F5b2063f14813067A2;
        address selfSepoliaVerifierAddress = 0xBAb69B0B5241c0be99282d531b9c53d7c966864F;

        L1SimpleResolver l1Resolver = new L1SimpleResolver(
            selfSepoliaVerifierAddress,
            0x83FC17A94115aE805f7C251635363eED5180FdAe
        );
        console.logString(
            string.concat(
                "contract deployed at: ",
                vm.toString(address(l1Resolver))
            )
        );
    }
}
