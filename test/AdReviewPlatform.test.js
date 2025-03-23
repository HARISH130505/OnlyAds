const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdReviewPlatform", function () {
    let adReviewPlatform;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        const AdReviewPlatform = await ethers.getContractFactory("AdReviewPlatform");
        adReviewPlatform = await AdReviewPlatform.deploy();
        await adReviewPlatform.deployed();

        [owner, user1, user2] = await ethers.getSigners();
    });

    it("should register a company", async function () {
        await adReviewPlatform.connect(owner).registerCompany("Test Company", { value: ethers.utils.parseEther("0.01") });
        const company = await adReviewPlatform.companies(0);
        expect(company.name).to.equal("Test Company");
        expect(company.owner).to.equal(owner.address);
    });

    it("should register a user", async function () {
        await adReviewPlatform.connect(user1).registerUser();
        expect(await adReviewPlatform.registeredUsers(user1.address)).to.be.true;
    });

    it("should add a product", async function () {
        await adReviewPlatform.connect(owner).registerCompany("Test Company", { value: ethers.utils.parseEther("0.01") });
        await adReviewPlatform.connect(owner).addProduct(0, "Test Product", "http://testvideo.com");
        const product = await adReviewPlatform.products(0);
        expect(product.name).to.equal("Test Product");
    });

    it("should submit a review", async function () {
        await adReviewPlatform.connect(owner).registerCompany("Test Company", { value: ethers.utils.parseEther("0.01") });
        await adReviewPlatform.connect(owner).addProduct(0, "Test Product", "http://testvideo.com");
        await adReviewPlatform.connect(user1).registerUser();
        await adReviewPlatform.connect(user1).submitReview(0, 5);
        
        const reviews = await adReviewPlatform.productReviews(0);
        expect(reviews.length).to.equal(1);
        expect(reviews[0].rating).to.equal(5);
    });

    it("should update average rating", async function () {
        await adReviewPlatform.connect(owner).registerCompany("Test Company", { value: ethers.utils.parseEther("0.01") });
        await adReviewPlatform.connect(owner).addProduct(0, "Test Product", "http://testvideo.com");
        await adReviewPlatform.connect(user1).registerUser();
        await adReviewPlatform.connect(user1).submitReview(0, 5);
        await adReviewPlatform.connect(user2).registerUser();
        await adReviewPlatform.connect(user2).submitReview(0, 3);

        const product = await adReviewPlatform.products(0);
        const averageRating = product.totalRatings / product.totalReviews;
        expect(averageRating).to.equal(4); // (5 + 3) / 2
    });
});