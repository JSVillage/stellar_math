Feature: stellar_math

    Scenario Outline: api routes
        Given I make a "<method>" request to stellar_math on "<route>"
        And with a "<valid>" body in the request
        Then a "<result>" status is received from the api

    Examples:
        | method | route              | valid        | result |
        | GET    | /health            | NA           | 200    |
        
        | POST   | /signup            | invalidReq   | 400    |
        | POST   | /signup            | existing     | 400    |
        | POST   | /signup            | invalidEmail | 400    |

    Scenario Outline: controller routes
        Given I make a "<method>" request to stellar_math on "<route>"
        And with a "<valid>" body in the request
        Then a "<status>" status is received with the html page

    Examples:
        | method | route              | valid        | status |
        | GET    | /                  | NA           | 200    |