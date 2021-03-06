"use strict";

var request = require("supertest");
var should = require("chai").should();
var expect = require("chai").expect();
var sailsHelper = require("./../helpers/sailsHelper");
var sails;

before(function(done) {
    sailsHelper.build(function(error, _sails) {
        if (error || !_sails) {
            return done(error || "Sails could not be instantiated.");
        }

        sails = _sails;

        return done();
    });
});

describe("not logged in user", function() {

    describe("trying to sign in", function() {

        describe("with invalid credential data", function() {
            var loginData = {
                username: "foo",
                password: "bar"
            };

            describe("without CSRF token", function() {
                it("user should be redirected to 403 page", function(done) {
                    request(sails.express.server)
                        .post("/login")
                        .send(loginData)
                        .expect(403)
                        .end(function (error, result) {
                            should.not.exist(error);
                            should.exist(result);

                            done();
                        });
                });
            });

            describe("with invalid CSRF token", function() {
                loginData._csrf = "invalidToken";

                it("user should be redirected to 403 page", function(done) {
                    request(sails.express.server)
                        .post("/login")
                        .send(loginData)
                        .expect(403)
                        .end(function(error, result) {
                            should.not.exist(error);
                            should.exist(result);

                            done();
                        });
                });
            });

            /**
             * This doesn't really work like it should...
             */
            /*
            describe("with valid CSRF token", function() {

                it("user should be redirected back to login form", function(done) {
                    sailsHelper.getCsrfToken(function(error, token) {
                        loginData._csrf = token;

                        request(sails.express.server)
                            .post("/login")
                            .send(loginData)
                            .expect(403)
                            .end(function(error, result) {
                                should.not.exist(error);
                                should.exist(result);

                                done();
                            });
                    });
                });
            });
            */
        });
    });
});

