//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import {DeployYourContract} from "./DeployYourContract.s.sol";
import {DeployL2DataContract} from "./DeployL2DataContract.s.sol";
import {DeployL1SimpleResolver} from "./DeployL1SimpleResolver.s.sol";

// import {DeployL1SimpleResolver} from "./DeployL1SimpleResolver.s.sol";

// import {DeployL1SimpleResolver} from "./DeployL1SimpleResolver.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        // DeployL2DataContract deployL2DataContract = new DeployL2DataContract();
        // deployL2DataContract.run();
        DeployL1SimpleResolver deployL1SimpleResolver = new DeployL1SimpleResolver();
        deployL1SimpleResolver.run();
    }
}
