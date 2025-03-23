// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AdReviewPlatform {
    address public owner;
    uint256 public rewardPer100Ads = 0.01 ether;

    struct User {
        uint256 adsWatched;
        uint256 earnings;
    }

    struct Product {
        string name;
        string demoVideo;
        uint256 rating;
    }

    struct Company {
        string name;
        string website;
        string demoVideo;
        address owner;
        Product[] products;
    }

    mapping(address => User) public users;
    mapping(address => Company) public companies;
    address[] public companyList;

    event AdWatched(address indexed user, uint256 totalAds, uint256 earnings);
    event CompanyRegistered(address indexed companyOwner, string name);
    event ProductRated(
        address indexed companyOwner,
        string productName,
        uint256 rating
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function watchAd() external {
        users[msg.sender].adsWatched++;
        if (users[msg.sender].adsWatched % 100 == 0) {
            users[msg.sender].earnings += rewardPer100Ads;
        }
        emit AdWatched(
            msg.sender,
            users[msg.sender].adsWatched,
            users[msg.sender].earnings
        );
    }

    function withdrawEarnings() external {
        uint256 amount = users[msg.sender].earnings;
        require(amount > 0, "No earnings to withdraw");
        users[msg.sender].earnings = 0;
        payable(msg.sender).transfer(amount);
    }

    function registerCompany(
        string memory _name,
        string memory _website,
        string memory _demoVideo
    ) external {
        require(
            bytes(companies[msg.sender].name).length == 0,
            "Company already registered"
        );

        // Fix: Initialize each field separately instead of trying to copy the entire struct
        companies[msg.sender].name = _name;
        companies[msg.sender].website = _website;
        companies[msg.sender].demoVideo = _demoVideo;
        companies[msg.sender].owner = msg.sender;
        // The products array is already initialized as empty by default

        companyList.push(msg.sender);
        emit CompanyRegistered(msg.sender, _name);
    }

    function addProduct(
        string memory _name,
        string memory _demoVideo
    ) external {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        companies[msg.sender].products.push(Product(_name, _demoVideo, 0));
    }

    function rateProduct(
        address _company,
        uint256 _productIndex,
        uint256 _rating
    ) external onlyOwner {
        require(
            _productIndex < companies[_company].products.length,
            "Invalid product index"
        );
        companies[_company].products[_productIndex].rating = _rating;
        emit ProductRated(
            _company,
            companies[_company].products[_productIndex].name,
            _rating
        );
    }

    function updateReward(uint256 _newReward) external onlyOwner {
        rewardPer100Ads = _newReward;
    }

    function getCompanyProducts(
        address _company
    ) external view returns (Product[] memory) {
        uint256 length = companies[_company].products.length;
        Product[] memory products = new Product[](length);

        for (uint256 i = 0; i < length; i++) {
            products[i] = companies[_company].products[i];
        }

        return products;
    }

    function getCompanyList() external view returns (address[] memory) {
        return companyList;
    }

    function getCompany(
        address _company
    )
        external
        view
        returns (string memory, string memory, string memory, address)
    {
        Company storage company = companies[_company];
        return (
            company.name,
            company.website,
            company.demoVideo,
            company.owner
        );
    }

    function getAllProducts()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        // Count total products across all companies
        uint256 totalProducts = 0;
        for (uint256 i = 0; i < companyList.length; i++) {
            address companyAddr = companyList[i];
            totalProducts += companies[companyAddr].products.length;
        }

        // Create arrays to store product information
        address[] memory productCompanies = new address[](totalProducts);
        string[] memory productNames = new string[](totalProducts);
        string[] memory productVideos = new string[](totalProducts);
        uint256[] memory productRatings = new uint256[](totalProducts);

        // Fill arrays with product data
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < companyList.length; i++) {
            address companyAddr = companyList[i];
            Product[] memory companyProducts = companies[companyAddr].products;

            for (uint256 j = 0; j < companyProducts.length; j++) {
                productCompanies[currentIndex] = companyAddr;
                productNames[currentIndex] = companyProducts[j].name;
                productVideos[currentIndex] = companyProducts[j].demoVideo;
                productRatings[currentIndex] = companyProducts[j].rating;
                currentIndex++;
            }
        }

        return (productCompanies, productNames, productVideos, productRatings);
    }

    receive() external payable {}
}
